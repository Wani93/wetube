import multer from 'multer';

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = 'Wetube';
  res.locals.loggedInUser = req.session.user;
  next();
};

// User 로그인 체크 미들웨어
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash('error', 'Not authorized');
    res.redirect('login');
  }
};

// 비로그인 상태에서 접근할 수있게 하는 미들웨어
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    req.flash('error', 'Not authorized');
    res.redirect('/');
  }
};

export const uploadAvatar = multer({
  dest: 'uploads/avatars/',
  limit: {
    fileSize: 3000000,
  },
});

export const uploadVideo = multer({
  dest: 'uploads/videos/',
  limit: {
    fileSize: 10000000,
  },
});
