namespace API.MODELS{


   public class reservation
{
    public int reservation_id { get; set; }
    public List<string> food_name { get; set; } = new();
    public List<int> itemprice { get; set; } = new();
    public string email_address { get; set; }
}
}