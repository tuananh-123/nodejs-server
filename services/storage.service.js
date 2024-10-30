const fs = require('fs').promises;
const path = require('path');

class Storage{
    File = {
        save: async (path) => {
            try {
                await fs.writeFile(path, "HI there!");
            } catch (error) {
                throw new Error("Cannot save file");
            }
        },
        delete: async (path) => {
            try {
                await fs.unlink(path)
            } catch (error) {
                throw new Error("Cannot remove file");
            }
        }
    }

    Directory = {
        create: async (path) => {
            try {
                await fs.mkdir(path, {recursive: true});
            }catch (error) {
                throw new Error("Cannot create directory");
            }
        },
        delete: async (path) => {
            try {
                await fs.rmdir(path, {recursive: true});
            } catch (error) {
                throw new Error("Cannot remove directory");
            }
        }
    }
}

module.exports = new Storage();