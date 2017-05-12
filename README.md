# egg_heads
## Roadmap: 

```https://egg-heads.herokuapp.com/```

### Chef workflow:

- signup chef

    - POST to ```/auth/signup```

    ```js
    { 
      "email": <email>,
      "password": <password>,
      "chef": true 
    }
    ```

- copy the token that is returned. Set token as the value for an ```Authorization``` header

- to add a meal, GET ```/ingredients``` 

    - copy the IDs of the ingredients for the meal(s) you want to add

    - if the ingredients for your meal don't exist, add them by POSTing to ```/ingredients``` (you can post this as an array!)

        ```js

        {
            "name": <ingredient>
        }
        ```

    - now POST to ```/meals```
    
    ```
    { 
    "name": <ingredientName>,
    "ingredients": [<ingredientID>, <ingredientID>, <ingredientID>, <ingredientID>]
    }
    ```

### User workflow:

- POST to ```/auth/signup```

    ```js
    { 
      "email": <email>,
      "password": <password>
    }
    ```

    - copy the token that is returned. Set token as the value for an ```Authorization``` header

    - to add ingredients to your fridge, GET to ```/ingredients``` 

    - if the ingredients you have don't show up, add them by POSTing to ```/ingredients``` (you can post this as an array!)

        ```js
        {
            "name": <ingredient>
        }
        ```

    - copy the IDs of the ingredients you want to add to your fridge 

    - to add those ingredients to your fridge, POST an array of their IDs to ```/me/fridge```

        ```js
        [{
            "ingredient": <ingredientID>
        },
        {
            "ingredient": <ingredientID>
        },
        {
            "ingredient": <ingredientID>
        },
        {
            "ingredient": <ingredientID>
        }]
        ```

    - if you want to see your dashboard (and what's in your fridge), GET to ```/me```

    - to see what meals you can make from the ingredients in your frige, GET to ```/me/meals```

    - if you want to save a meal that you liked, add it to your favorites by POSTing to ```/me/favorites```

        ```js
        { "meal": <mealID> }
        ```
        
# ACTUAL README

### Examples:
- POST to /meals as chef
    ```js
    {
    "name": "grilled cheese",
    "ingredients": 
        [
        "591494eba84cac001175ec41",
        "591494eba84cac001175ec42",
        "591494eba84cac001175ec43"
        ]
    }
    ```
* POST to /ingredients as any role
    ```js
    [
    {
        "name": "rice"
    },
    {
        "name": "onions"
    },
    {
        "name": "tofu"
    }
    ]
    ```

* Can PUT to /me to update user, i.e. if you want to make yourself a chef because you're awesome at cooking now.
If you do this, you must sign in again and take your new token when posting to /meals doing other chef only actions.

* To POST to your fridge: /me/fridge: 
    * Example: 
    ```json
    [
        {
        "ingredient": "59149c8b2b50558d2e1fb6ff"
        },
        {
        "ingredient": "59149c8b2b50558d2e1fb700"
        },
        {
        "ingredient": "59149c8b2b50558d2e1fb701"
        }
    ]
    ```



        notes for us right now:

        59149c8b2b50558d2e1fb6ff
        59149c8b2b50558d2e1fb700
        59149c8b2b50558d2e1fb701
    
    {
        "name": "stir fry",
        "ingredients": 
            [
            "59149c8b2b50558d2e1fb6ff",
    		"59149c8b2b50558d2e1fb700",
        	"59149c8b2b50558d2e1fb701"
            ]
        }
