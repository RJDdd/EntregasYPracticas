# El patrón modelo-vista-controlador

### ¿Que es MVC?
MVC significa modelo (model) vista (view) controlador (controller). Esto es lo que significan cada uno de esos componentes.

 - Modelo: El backend que contiene toda la lógica de datos
- Vista: El frontend o interfaz gráfica de usuario (GUI)
- Controlador: El cerebro de la aplicación que controla como se muestran los datos.

---

 ![Foto](/IMG%20-%20copia/MVC3.png)

 Los tres componentes de MVC están interconectados. La vista muestra el modelo para el usuario, después el controlador acepta la entrada del usuario y actualiza el modelo y debido a esta acción la vista vuelve a tener un cambio con los datos actualizados.

Este patrón de diseño es uno de los más utilizados en la actualidad. Existen muchos frameworks en diferentes lenguajes que utilizan MVC, como Laravel para PHP, Django para Python, Ruby on Rails para Ruby, Express para NodeJS entre otros.

### Ejemplo en un juego de Unity (C#)
Supongamos que tienes un personaje en Unity con salud y quieres aplicar MVC.

#### Modelo (HealthModel.cs)

```
public class HealthModel
{
    public int Health { get; private set; } = 100;

    public event Action OnHealthChanged;

    public void TakeDamage(int damage)
    {
        Health -= damage;
        OnHealthChanged?.Invoke();
    }
}
```
#### Vista (HealthView.cs)
```
using UnityEngine;
using UnityEngine.UI;

public class HealthView : MonoBehaviour
{
    public Text healthText;

    public void UpdateHealthDisplay(int health)
    {
        healthText.text = "Health: " + health;
    }
}
```
#### Controlador (HealthController.cs)
```
using UnityEngine;

public class HealthController : MonoBehaviour
{
    public HealthModel model;
    public HealthView view;

    private void Start()
    {
        model.OnHealthChanged += () => view.UpdateHealthDisplay(model.Health);
        view.UpdateHealthDisplay(model.Health);
    }

    public void TakeDamage(int damage)
    {
        model.TakeDamage(damage);
    }
}
```
### Referencias

- https://www.freecodecamp.org/espanol/news/el-modelo-de-arquitectura-view-controller-pattern/

- Documentación oficial de Unity: https://docs.unity3d.com/ -->
