<?php

/* Предупреждение: символ = нельзя использовать в названии сайта */

$filename = "transitions.txt";
$return = "index.html";

if (preg_match("/loginov.rocks/", $_SERVER['HTTP_REFERER'])) {
    $site = $_POST['site'];

    if ($site) {
        header("Content-type: text/plain; charset=windows-1251");
        header("Cache-Control: no-store, no-cache, must-revalidate");

        $strings = file($filename);

        foreach ($strings as $key => $string) {
            list($ssite, $svalue) = explode("=", $string);
            if ($ssite == $site) {
                $strings[$key] = $ssite . "=" . ($svalue + 1);
                $finded = 1;
            }
            else
                $strings[$key] = trim($string);
        }

        if (!$finded)
            $strings[] = $site . "=1";

        $file = fopen($filename, "w");
        fwrite($file, implode("\r\n", $strings));
        fclose($file);
    }
    else
        header("Location: " . $return);
}
else
    header("Location: " . $return);
