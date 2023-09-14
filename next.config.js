/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: "/api/patients/herbal-pharmacy",
                    destination:
                        "http://192.168.61.68:7876/hai/HttpEntry/?service=PGJH_CYFDL&urid=PDJH&pwd=PDJH",
                },
                {
                    source: "/api/patients/east-courtyard/pharmacy",
                    destination:
                        "http://192.168.61.135/hai/HttpEntry/?service=ALFYJ_PDDL&urid=HIS&pwd=HIS",
                },
            ],
        };
    },
    output: "standalone",
};

module.exports = nextConfig;
