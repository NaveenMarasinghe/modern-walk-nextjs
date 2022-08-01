module.exports = {
  tenants: [
    {
      name: "website-1",
      domains: [
        {
          development: /alpha\.abc\.com/,
          stage: "stage.abc.com",
          production: "abc.com",
        },
      ],
    },
    {
      name: "website-2",
      domains: [
        {
          development: /beta\.xyz\.com/,
          stage: "stage.xyz.com",
          production: /[\w|\d|-|_]+\.xyz.com/,
        },
      ],
    },
  ],
};
