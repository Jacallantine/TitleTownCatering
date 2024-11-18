namespace API.MODELS
{
    public class reservationRequest {
        public reservation Reservation { get; set; }
        public List<FoodInstance> FoodInstances { get; set; }
    }
}