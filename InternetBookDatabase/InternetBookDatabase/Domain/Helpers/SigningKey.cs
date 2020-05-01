using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace WebCoreApplication.Helpers
{
    public class SigningKey
    {
		private const string key = "ht87345yr90irehf84959unfs66412";

        public static string Algorithm { get; } = SecurityAlgorithms.HmacSha256;

        public static SecurityKey GetKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        }
	}
}