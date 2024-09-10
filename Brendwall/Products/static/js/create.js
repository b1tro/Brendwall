var button = document.querySelector('#create_product_button')
var form = document.querySelector('#create_product_form')
button.addEventListener("click", e => {
    // Получаем текущий адрес URL, так как заполнение формы и отправка POST-запроса
    // происходит по одной и той же ссылке
    var url = window.location.href

    // Получаем данные с формы
    var formData = new FormData(form)
    var jsonFormData = {}
    formData.forEach((value, key) => jsonFormData[key] = value)
    // Трансформируем данные в JSON
    jsonFormData = JSON.stringify(jsonFormData)
    // Отправляем fetch-запрос
    fetch(url, {
        method : "POST",
        headers: {
            "Content-type": 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: jsonFormData
    })
        // Получаем результат запроса
        .then((response) => {
            // Если статус запроса положительный (201), то получаем все доступные продукты и выводим их в таблицу
            if (response.status === 201){
                fetch (window.location.origin + "/products")
                    .then(response => response.json())
                    .then(data => {
                        var table = document.createElement("table");
                        table.classList.add("products_table")
                        data.forEach(obj => {
                            const row = table.insertRow();

                            const cellId = row.insertCell(0);
                            const cellName = row.insertCell(1);
                            const cellDescription = row.insertCell(2);
                            const cellPrice = row.insertCell(3);

                            cellId.textContent = obj.id;
                            cellName.textContent = obj.name;
                            cellDescription.textContent = obj.description;
                            cellPrice.textContent = obj.price;
                        })


                        // Смотрим, возникали ли ошибки раньше, чтобы убрать их, так как теперь мы имеем саксесс
                        var created_errors = document.querySelector(".error_list")
                        created_errors.innerText = ""
                        // Смотрим создавалась ли таблица ранее, чтобы будущие таблицы просто заменяли друг друга, а не шли подряд
                        var created_table = document.querySelector(".products_table")
                        if (created_table === null) {
                            document.body.appendChild(table)
                        }
                        else{
                            created_table.innerHTML = table.innerHTML;
                        }
                    })
            }
            else {
                // Если статус не 201, то есть возникла ошибка, то получаем список ошибок и выводим их
                response.json()
                    .then(data => {
                        var errors = document.createElement("div");
                        errors.classList = "error_list"
                        errors.innerText = "Невозможно создать продукт: "
                        Object.entries(data).forEach( (e) => {
                            var error = document.createElement("p");
                            error.innerText = e[0] + ": " + e[1]
                            errors.appendChild(error)
                        })
                        var created_errors = document.querySelector(".error_list")
                        if (created_errors === null) {
                            document.body.appendChild(errors)
                        }
                        else{
                            created_errors.innerHTML = errors.innerHTML;
                        }
                    })

            }
        })
})