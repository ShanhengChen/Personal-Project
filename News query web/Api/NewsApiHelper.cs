using System.Text.Json;

namespace newsapi
{
    public class NewsApiHelper
    {

        public async Task<Response> GetNewsByKeywordAsync(string keyword)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://newsdata.io/api/1/");
                string apiKey = "pub_272117d0f0e217cd986896599986d7b073fb2";
                string queryString = $"news?apikey={apiKey}&q=”{keyword}”";
                var response = await client.GetAsync(queryString);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var responseObject = JsonSerializer.Deserialize<Response>(responseContent);
                    return responseObject;
                }
                else
                {
                    return null; // Handle error scenario here
                }
            }
        }
    }
}
