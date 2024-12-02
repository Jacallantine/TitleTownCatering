namespace API.MODELS
{
    public class reservationInfo
    {
        public int reservation_id { get; set; }
        public int food_id { get; set; }
        public int quantity { get; set; }
        public string date { get; set; }
        public string foodName { get; set; }
    }
}