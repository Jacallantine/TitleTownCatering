namespace API.MODELS{


   public class reservation
{
        public int reservation_id { get; set; }
        public string email_address { get; set; }
        public string date { get; set; }
        public string address { get; set; }
        public List<FoodInstance> FoodInstances { get; set; } = new List<FoodInstance>();
}
}