module.exports = {
  tenants: [
    {
      name: "alpha",
      domains: [
        {
          development: /alpha\.abc\.com/,
          stage: "stage.abc.com",
          production: "abc.com",
        },
      ],
    },
    {
      name: "beta",
      domains: [
        {
          development: /beta\.abc\.com/,
          stage: "stage.xyz.com",
          production: /[\w|\d|-|_]+\.xyz.com/,
        },
      ],
    },
  ],
};
