import template from "./template.marko";

export default (req, res) => {
  const renderMode = req.query.renderMode || 'progressive-out-of-order';
  res.marko(template, {
    renderMode
  });
};
