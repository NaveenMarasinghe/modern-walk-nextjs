module.exports = {
  tenants: [
    {
      name: "alpha",
      domains: [
        {
          development: /alpha\.abc\.com/,
          stage:
            /alpha.modernwalkapp-env.eba-y3yhjrku.ap-south-1.elasticbeanstalk.com/,
          production: /alpha\.abc\.com/,
        },
      ],
    },
  ],
};
