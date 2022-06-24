import path from "path";

// Output file name
const fileName: string = "access.log";

// Config log file stream
const streamLogOptions = {
    interval: "1d", // rotate daily
    path: path.join(__dirname, "/../../log"),
};

export default {
    fileName,
    streamLogOptions,
};
