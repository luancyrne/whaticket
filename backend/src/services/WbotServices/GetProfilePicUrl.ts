import AppError from "../../errors/AppError";
import GetDefaultWhatsApp from "../../helpers/GetDefaultWhatsApp";
import { getWbot } from "../../libs/wbot";
import config from '../../config/config'

const GetProfilePicUrl = async (number: string): Promise<string> => {
  const defaultWhatsapp = await GetDefaultWhatsApp();
  const wbot = getWbot(defaultWhatsapp.id);
  let profilePicUrl: string

  try {
    profilePicUrl = await wbot.profilePictureUrl(`${number}@s.whatsapp.net`);
  } catch (err) {
     profilePicUrl = `${config.frontend}/nopicture.png`;
  }

  return profilePicUrl;
};

export default GetProfilePicUrl;
