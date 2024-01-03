using Microsoft.AspNetCore.Mvc;
using News.Models;
using newsapi;
using System.Diagnostics;

namespace News.Controllers
{
	public class HomeController : Controller
	{
		private readonly ILogger<HomeController> _logger;

		public HomeController(ILogger<HomeController> logger)
		{
			_logger = logger;
		}

		public IActionResult Index()
		{
			return View();
		}

        public async Task<IActionResult> SearchNews([FromQuery] newsString model)
        {
            string searchQuery = model.SearchQuery;
            var newsApiHelper = new NewsApiHelper(); // 注意这里不需要实例化传递参数

            // 调用 GetNewsByKeywordAsync 方法获取结果
            var newsResponse = await newsApiHelper.GetNewsByKeywordAsync(searchQuery);

            if (newsResponse == null)
            {
                return Content("Search results for: fail");
            }
            ViewBag.NewsResponse = newsResponse;

            return View("Privacy");
        }




        public IActionResult Privacy()
		{
			return View();
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}
}