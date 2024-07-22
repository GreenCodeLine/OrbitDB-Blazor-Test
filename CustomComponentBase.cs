using Microsoft.AspNetCore.Components;

namespace OrbitDB.Blazor.Client
{
    public class CustomComponentBase : ComponentBase
    {

        [Inject] protected NavigationManager NavigationManager { get; set; }

        protected void NavigateToHome()
        {
            NavigationManager.NavigateTo("/");
        }
    }
}
