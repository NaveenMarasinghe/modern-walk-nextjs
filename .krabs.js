module.exports = {
  tenants: [
    {
      name: "modernwalk",
      domains: [
        {
          development: /[a-z]*\.modernwalk\.com/,
          production:
            "shop1.modernwalkapp-env.eba-y3yhjrku.ap-south-1.elasticbeanstalk.com/",
        },
      ],
    },
  ],
};
