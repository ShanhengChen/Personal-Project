using System.Text.Json.Serialization;

namespace newsapi
{

    public class Response
        {
            public string status { get; set; } = string.Empty;
        public int totalResults { get; set; } = 0;
        public List<NewsArticle> results { get; set; } = new List<NewsArticle>();
        }

        public class NewsArticle
        {
        public string title { get; set; } = string.Empty;
        public string link { get; set; } = string.Empty;    
         public string sourceId { get; set; }  = string.Empty;    
        public List<string> keywords { get; set; } = new List<string>();
        public List<string> creator { get; set; } = new List<string>();
        public string imageUrl { get; set; } = string.Empty; 
         public string videoUrl { get; set; } = string.Empty;
         public string description { get; set; } = string.Empty;
        [JsonPropertyName("pubDate")]
        public object pubDate { get; set; }
        public string content { get; set; } = string.Empty;
        public List<string> countries { get; set; } = new List<string>();
        public List<string> category { get; set; } = new List<string>();
        public string language { get; set; } = string.Empty;
        }
}
