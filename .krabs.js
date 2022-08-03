module.exports = {
  tenants: [
    {
      name: "alpha",
      domains: [
        {
          development: /alpha\.abc\.com/,
          stage:
            /alpha.modernwalkapp-env.eba-y3yhjrku.ap-south-1.elasticbeanstalk.com/,
          production: "abc.com",
        },
      ],
    },
    {
      name: "beta",
      domains: [
        {
          development: /beta\.abc\.com/,
          stage:
            /beta.modernwalkapp-env.eba-y3yhjrku.ap-south-1.elasticbeanstalk.com/,
          production: /[\w|\d|-|_]+\.xyz.com/,
        },
      ],
    },
  ],
};
