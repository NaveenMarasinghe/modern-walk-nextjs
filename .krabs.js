module.exports = {
  tenants: [
    {
      name: "modernwalk",
      domains: [
        {
          development: /[a-z]*\.modernwalk\.com/,
          production:
            /[a-z0-9]*\.modernwalkapp-env\.eba-y3yhjrku\.ap-south-1\.elasticbeanstalk\.com/,
        },
      ],
    },
  ],
};
