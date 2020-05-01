using System;

namespace InternetBookDatabase.Domain.Models.Response
{
    public class UserToken
    {
        public int UserId { get; set; }
        public string Token { get; set; }
        public DateTime ValidTo { get; set; }
    }
}