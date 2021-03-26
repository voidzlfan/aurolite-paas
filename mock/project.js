function getProject(req, res, u) {
  //console.log('req',req);
  //console.log('req', req.url);

  const param = req.url.substr(-6, 6);

  if (param === 'online') {
    return res.json([
      {
        projectId: 24124,
        projectName: 'xxxxxx',
        subProjectTitle: '副标题',
        createTime: 21312345612,
        totalDevices: 20,
        online: 6,
        offline: 0,
        exception: 12,
      },
    ]);
  }

  return res.json([
    {
      projectId: 1,
      projectName: 'Aurolite Test',
      subProjectTitle: '副标题',
      createTime: 21312345612,
      totalDevices: 20,
      online: 6,
      offline: 0,
      exception: 12,
    },
    {
      projectId: 2,
      projectName: '奥莱展厅',
      subProjectTitle: '副标题',
      createTime: 2131212112,
      totalDevices: 20,
      online: 0,
      offline: 0,
      exception: 0,
    },
  ]);
}

export default {
  '/api/project': getProject,
};
