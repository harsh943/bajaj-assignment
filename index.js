
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array."
            });
        }
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let concatenatedAlphabets = '';
        let sum = 0; 

        const alphaRegex = /^[a-zA-Z]+$/;

        data.forEach(item => {
            if (!isNaN(item) && item.trim() !== '') {
                const num = parseInt(item, 10);
                sum += num; 
                if (num % 2 === 0) {
                    even_numbers.push(String(item)); 
                } else {
                    odd_numbers.push(String(item)); 
                }
            }
            else if (alphaRegex.test(item)) {
                alphabets.push(item.toUpperCase());
                concatenatedAlphabets += item; 
            }
            else {
                special_characters.push(String(item));
            }
        });
        let concat_string = '';
        const reversedAlphabets = concatenatedAlphabets.split('').reverse().join('');
        for (let i = 0; i < reversedAlphabets.length; i++) {
            if (i % 2 === 0) {
                concat_string += reversedAlphabets[i].toUpperCase();
            } else {
                concat_string += reversedAlphabets[i].toLowerCase();
            }
        }

        // Static user data 
        const user_id = "Harsh_deep_22BCE2082";
        const email = "deepharsh9060@gmail.com";
        const roll_number = "22BCE2082";
        const response = {
            is_success: true,
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: String(sum), 
            concat_string: concat_string
        };
        res.status(200).json(response);

    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({
            is_success: false,
            error: "An internal server error occurred."
        });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});