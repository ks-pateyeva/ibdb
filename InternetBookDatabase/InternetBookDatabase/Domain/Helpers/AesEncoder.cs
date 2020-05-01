using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace WebCoreApplication.Helpers
{
    internal static class AesEncoder
    {

		#region fields

		private static string ivConst = "oGh9syRhgl94gS1m";
		private static string keyConst = "ajI7laEg903kiA3";

		private static byte[] salt = { 0xd1, 0xf2, 0x21, 0xe3, 0xa5, 0x78, 0x3d, 0x25 };

		private static Dictionary<string, byte[]> cache;

		#endregion
		#region properties

		#endregion
		

        static AesEncoder()
		{
			cache = new Dictionary<string, byte[]>(2);

			Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(Encoding.ASCII.GetBytes(keyConst), salt, 1);
			byte[] bytes = pdb.GetBytes(256 / 8);
			cache[keyConst] = bytes;
		}

        public static string Encrypt(string str)
		{
			if (string.IsNullOrEmpty(str))
			{
				return str;
			}
			byte[] encrypt = InternalEncrypt(str, keyConst, ivConst);
			return ConvertHexToStr(encrypt);
		}

		private static byte[] InternalEncrypt(string data, string key, string initVector)
		{
			using (MemoryStream ms = new MemoryStream())
			{
				using (AesCryptoServiceProvider AES = new AesCryptoServiceProvider())
				{
					byte[] iv = Encoding.ASCII.GetBytes(initVector);
					byte[] key2 = cache[key];
					AES.Mode = CipherMode.CBC;
					using (ICryptoTransform enc = AES.CreateEncryptor(key2, iv))
					{
						using (CryptoStream cs = new CryptoStream(ms, enc, CryptoStreamMode.Write))
						{
							using (StreamWriter swEncrypt = new StreamWriter(cs))
							{
								swEncrypt.Write(data);
							}
						}
					}
				}
				return ms.ToArray();
			}
		}

		public static string Decrypt(string str)
		{
			if (string.IsNullOrEmpty(str))
			{
				return str;
			}
			try
			{
				byte[] data = ConvertStrToHex(str);
				string decrypt = InternalDecrypt(data, keyConst, ivConst);
				return decrypt;
			}
			catch (Exception)
			{
				return str;
			}
		}

		private static string InternalDecrypt(byte[] data, string key, string initVector)
		{
			string result;
			byte[] iv = Encoding.ASCII.GetBytes(initVector);
			byte[] key2 = cache[key];
			using (MemoryStream ms = new MemoryStream(data))
			{
				using (AesCryptoServiceProvider AES = new AesCryptoServiceProvider())
				{
					AES.Mode = CipherMode.CBC;
					using (ICryptoTransform enc = AES.CreateDecryptor(key2, iv))
					{
						using (CryptoStream cs = new CryptoStream(ms, enc, CryptoStreamMode.Read))
						{
							using (StreamReader srDecrypt = new StreamReader(cs))
							{
								result = srDecrypt.ReadToEnd();
							}
						}
					}
				}
			}
			return result;
		}

		private static string ConvertHexToStr(byte[] data)
		{
            char[] c = new char[data.Length * 2];
			int b;
			for (int i = 0; i < data.Length; i++)
			{
				b = data[i] >> 4;
				c[i * 2] = (char)(55 + b + (((b - 10) >> 31) & -7));
				b = data[i] & 0xF;
				c[i * 2 + 1] = (char)(55 + b + (((b - 10) >> 31) & -7));
			}
			return new string(c);
		}

		private static byte[] ConvertStrToHex(string str)
		{
			if (str == null || str.Length % 2 == 1)
			{
				throw new ArgumentException(string.Format("ConvertStrToHex() invalid length: {0}", str), "str");
			}

			try
			{
				byte[] bufferHex = new byte[str.Length / 2];

				for (int i = 0; i < bufferHex.Length; ++i)
				{
					int index = i << 1;
					int hex1 = str[index];
					int hex2 = str[index + 1];
					hex1 = hex1 - (hex1 < 58 ? 48 : (hex1 < 97 ? 55 : 87));
					hex2 = hex2 - (hex2 < 58 ? 48 : (hex2 < 97 ? 55 : 87));
					bufferHex[i] = (byte)((hex1 << 4) + (hex2));
				}

				return bufferHex;
			}
			catch (Exception e)
			{
				throw new ArgumentException(string.Format("ConvertStrToHex() failed. Str = {0}.", str), "str", e);
			}
		}
	}
}