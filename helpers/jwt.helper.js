const jwt = require("jsonwebtoken");

const signAccessToken = async (userId) => {
  try {
    userId = JSON.stringify(userId);

    const payload = {};
    const privateKey = process.env.accessTokenKey;
    const options = {
      expiresIn: "1d",
      issuer: "t.info",
      audience: userId,
    };

    const accessToken = await jwt.sign(payload, privateKey, options);
    return accessToken;
  } catch (error) {
    throw error;
  }
};

const verifyAccessToken = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      const error = new Error("No accessToken");
      error.statusCode = 403;
      throw error;
    }

    const accessToken = req.headers["authorization"].split(" ")[1];
    if (!accessToken) {
      const error = new Error("No accessToken");
      error.statusCode = 403;
      throw error;
    }

    const decoded = await jwt.verify(accessToken, process.env.accessTokenKey);

    if (!decoded) {
      const error = new Error("No accessToken");
      error.statusCode = 403;
      throw error;
    }

    req.userId = JSON.parse(decoded.aud);
    next();
  } catch (error) {
    if (
      error.name == "TokenExpiredError" ||
      error.name == "JsonWebTokenError"
    ) {
      throw error;
    }
    next(error);
  }
};

const signRefreshToken = async (userId) => {
  try {
    userId = JSON.stringify(userId);

    const payload = {};
    const privateKey = process.env.refreshTokenKey;
    const options = {
      expiresIn: "1d",
      issuer: "t.info",
      audience: userId,
    };

    const refreshToken = await jwt.sign(payload, privateKey, options);
    return refreshToken;
  } catch (error) {
    throw error;
  }
};

const verifyRefreshToken = async (refreshToken) => {
  try {
    const decoded = await jwt.verify(refreshToken, process.env.refreshTokenKey);
    const userId = JSON.parse(decoded.aud);

    return userId;
  } catch (error) {
    if (error.name == "TokenExpiredError" || error.name == "JsonWebTokenError")
      throw error;
  }
};

module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
