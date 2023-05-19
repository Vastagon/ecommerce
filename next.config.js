/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://ecommerce-rho-wine.vercel.app" },
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ];
    },
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "cdn-icons-png.flaticon.com",
            "fakestoreapi.com",
            "dummyimage.com"
        ],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
                port: "",
                pathname: "/",
            },
            {
                protocol: "https",
                hostname: "fakestoreapi.com",
                port: "",
                pathname: "/",
            },
            {
                protocol: "https",
                hostname: "cdn-icons-png.flaticon.com",
                port: "",
                pathname: "/",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/",
            },
            {
                protocol: "https",
                hostname: "t4.ftcdn.net",
                port: "",
                pathname: "/",
            },
        ],
    }
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
