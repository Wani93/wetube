import Video from '../models/Video';
import User from '../models/User';
import Comment from '../models/Comment';

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: 'desc' })
    .populate('owner');
  return res.render('home', { pageTitle: 'Home', videos });
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate('owner').populate('comments'); // ref한 User 모델 객체정보가 owner에 담김
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' });
  }
  console.log(video);
  return res.render('watch', { pageTitle: video.title, video });
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash('error', 'Not authorized');
    return res.status(403).redirect('/'); // 403: forbidden
  }
  return res.render('edit', { pageTitle: `Edit: ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  console.log('edit!');
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' });
  }

  if (String(video.owner) !== String(_id)) {
    req.flash('error', 'You are not the the owner of the video.');
    return res.status(403).redirect('/');
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  req.flash('success', 'Changes saved.');
  return res.redirect(`/videos/${id}`);
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}`, 'gi'),
      },
    }).populate('owner');
  }
  return res.render('search', { pageTitle: 'Search', videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views += 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  await video.save();
  return res.status(201).json({ newCommentId: comment._id }); // 201: created, 응답 데이터 전송
};

export const deleteComment = async (req, res) => {
  const {
    session: { user },
    params: { id },
  } = req;
  const comment = await Comment.findById(id);

  if (String(user._id) !== String(comment.owner)) {
    return res.sendStatus(403);
  }
  await Comment.findByIdAndDelete(id);
  const video = await Video.findById(comment.video);
  await Video.findByIdAndUpdate(video._id, {
    comments: video.comments.filter((com) => String(com) !== String(id)),
  });

  return res.sendStatus(200);
};
