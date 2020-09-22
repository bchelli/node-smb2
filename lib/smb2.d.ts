
class SMB2 {
    exists(path: string, callback: (error: string, exists: boolean) => void): void;
    rename(oldPath: string, newPath: string, callback: (error: string) => void): void;
    
    readFile(filename: string, callback: (error: string) => void): void;
    readFile(filename: string, options: { encoding: string }, callback: (error: string, data: string) => void): void;
    
    writeFile(filename: string, data: string | Buffer, callback: (error: string) => void): void;
    writeFile(filename: string, data: string | Buffer, options: { encoding: string }, callback: (error: string) => void): void;
    
    unlink(path: string, callback: (error: string) => void);
    readdir(path: string, callback: (error: string, files: string[]) => void);
    rmdir(path: string, callback: (error: string) => void);
    
    mkdir(path: string, callback: (error: string) => void);
    mkdir(path: string, mode: string, callback: (error: string) => void);

    writeFileStream(filename: string, data: any, fileLength: number, options: {encoding: string}, callback: (error: string) => void): Primise<void>;
}

export default SMB2;