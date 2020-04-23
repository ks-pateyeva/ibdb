namespace InternetBookDatabase.DBAL.Models
{
    public class UserPhoto
    {
        public int UserId { get; set; }
        public byte[] PhotoImage { get; set; }
    }
}