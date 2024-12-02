let path = strftime("%Y") . "/day" . strftime("%-d") . "/"
execute "edit " . path . "solution.js"
execute "bot split" . path . "test.txt | resize 12"
execute "rightbelow vert split" . path . "input.txt"
