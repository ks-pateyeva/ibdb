using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace WebCoreApplication.Helpers
{
    internal class ProductSecurity
    {
		internal static string GenerateToken(int userId, DateTime validTo)
        {
            var claims = new[]
            {
                new Claim("uId", userId.ToString()) //userId
            };

            return CreateToken(claims, validTo);
        }

        private static string CreateToken(Claim[] claims, DateTime validTo)
        {
            var token = new JwtSecurityToken(
                "IBDB",
                claims: claims,
                expires: validTo,
                signingCredentials: new SigningCredentials(SigningKey.GetKey(), SigningKey.Algorithm)
            );
            string strToken = new JwtSecurityTokenHandler().WriteToken(token);
            return strToken;
        }

	}
}