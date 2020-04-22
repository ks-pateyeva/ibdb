using Microsoft.AspNetCore.Mvc;

namespace InternetBookDatabase.Controllers
{
	public class HomeController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}