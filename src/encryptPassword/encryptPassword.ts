import bcrypt from "bcryptjs";

const encryptPWD = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const pwd = await bcrypt.hash(password, salt);
    return pwd;
  } catch (error) {
    console.error(error);
  }
};

export default encryptPWD;
