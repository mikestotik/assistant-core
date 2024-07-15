const allowedCommands = [ "ls", "cat", "df", "free", "echo" ];
export const validateCommand = (command: string, parameters: string[]) => {
  if (!allowedCommands.includes(command)) {
    throw new Error("Command not allowed");
  }
  const isValidParameters = parameters.every(param => /^[a-zA-Z0-9-_./]+$/.test(param));
  if (!isValidParameters) {
    throw new Error("Invalid parameters");
  }
  return true;
};