export const config = {
    port: process.env.PORT || 3100,
    supportedPostCount: 15,
    databaseUrl: process.env.MONGODB_URI || '',
    JwtSecret: ""
};
