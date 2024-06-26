/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: "/api/patients/east-courtyard/herbal-pharmacy",
                    destination:
                        "http://192.168.61.68:7876/hai/HttpEntry/?service=PDJH_CYFDL&urid=PDJH&pwd=PDJH",
                },
                {
                    source: "/api/patients/east-courtyard/pharmacy",
                    destination:
                        "http://192.168.61.68:7876/hai/HttpEntry/?service=ALFYJ_PDDL&urid=HIS&pwd=HIS",
                },
                {
                    source: "/api/patients/west-courtyard/herbal-pharmacy",
                    destination:
                        "http://192.168.61.68:7876/hai/HttpEntry/?service=PDJH_CYFDL&urid=PDJH&pwd=PDJHH",
                },
                {
                    source: "/api/patients/west-courtyard/pharmacy",
                    destination:
                        "http://192.168.61.68:7876/hai/HttpEntry/?service=ALFYJ_PDDL&urid=HIS&pwd=HISS",
                },
                {
                    source: "/api/patients/east-courtyard/pharmacy/call",
                    destination:
                        "http://192.168.61.68:7876/hai/HttpEntry/?service=ALFYJ_GXJHBZ&urid=HIS&pwd=HIS",
                },
                {
                    source: "/api/patients/east-courtyard/herbal-pharmacy/call",
                    destination:
                        "http://192.168.61.68:7876/hai/HttpEntry/?service=PDJH_CYFJHBZ&urid=HIS&pwd=HIS",
                },
                {
                    source: "/api/patients/west-courtyard/pharmacy/call",
                    destination:
                        "http://192.168.61.68:7876/hai/HttpEntry/?service=ALFYJ_GXJHBZ&urid=HIS&pwd=HIS",
                },
                {
                    source: "/api/patients/west-courtyard/herbal-pharmacy/call",
                    destination:
                        "http://192.168.61.68:7876/hai/HttpEntry/?service=PDJH_CYFJHBZ&urid=HIS&pwd=HIS",
                },
            ],
        };
    },
    output: "standalone",
};

module.exports = nextConfig;
