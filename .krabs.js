module.exports = {
  tenants: [
    {
      name: "modernwalk",
      domains: [
        {
          development: /[a-z]*\.modernwalk\.com/,
          production:
            /[a-z]*\.modernwalkapp-env.eba-y3yhjrku.ap-south-1.elasticbeanstalk.com/,
        },
      ],
    },
  ],
};
