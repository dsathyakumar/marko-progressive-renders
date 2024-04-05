import template from "./template.marko";

const getAPromise = (sectionName, delay) => {
    const renderPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                sectionName
            });
        }, delay);
    });
    return renderPromise;
}

export default async (req, res) => {
    const renderMode = req.query.renderMode || 'progressive-out-of-order';
    const reorder = renderMode === 'progressive-out-of-order';
    let viewModel = {
        headerDataProvider: getAPromise('header', 2000),
        navDataProvider: getAPromise('nav', 500),
        mainDataProvider: getAPromise('main', 3000),
        footerDataProvider: getAPromise('footer', 1000),
        renderMode: renderMode,
        reorderEnabled: reorder
    };

    if (renderMode === 'single-chunk') {
        template.render(viewModel, (err, html) => {
            if (err) {
                console.log(err);
                console.log('erroed!');
                res.end(err.toString());
                return;
            }
            res.end(html.toString());
        });
    } else {
        res.marko(template, viewModel);
    }
};
