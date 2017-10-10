<?php

// function incrementSuffix($oldSuffix)
// {
//     $sArray = str_split($oldSuffix);
//     $first = $sArray[0];
//     $second = $sArray[1];

//     $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     $alphas = str_split($chars);

//     $indexToReplace = 1;
//     if (strtolower($second) == 'z'){
//         $indexToReplace = 0;
//         $sArray[1] = 'A';
//     }

//     $r_letter_index = stripos( $chars, $sArray[ $indexToReplace ] );
//     $new_letter = substr($chars, ($r_letter_index + 1), 1);
//     $sArray[ $indexToReplace ] = $new_letter;

//     return strtoupper( implode( $sArray ) );
// }

function leadingZeroes( $num, $length = 5 )
{
	$len = strlen( $num );
	$length;
	$leading_zeroes = '';

	if ( (int) $num == 0 || $len >= $length ) return $num;

	$diff = $length - $len;
	for ($i=0; $i < $diff; $i++) { 
		$leading_zeroes .= '0';
	}

	return $leading_zeroes.($num);

}

function genPlateNum( $lg_code, $last_num, $suffix, $amount )
{
    function incrementSuffix($oldSuffix)
    {
        $sArray = str_split($oldSuffix);
        $first = $sArray[0];
        $second = $sArray[1];
    
        $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $alphas = str_split($chars);
    
        $indexToReplace = 1;
        if (strtolower($second) == 'z'){
            $indexToReplace = 0;
            $sArray[1] = 'A';
        }
    
        $r_letter_index = stripos( $chars, $sArray[ $indexToReplace ] );
        $new_letter = substr($chars, ($r_letter_index + 1), 1);
        $sArray[ $indexToReplace ] = $new_letter;
    
        return strtoupper( implode( $sArray ) );
    }

    function generator($lg_code, $index, $count_check, $suffix, &$plate_numbers)
    {
        $new_num = $index + 1;
        $done = 0;
        for($i = $index; $i < $count_check; $i++){
            $new_number_formatted = leadingZeroes($new_num, 3);
            $plate_numbers[] = "{$lg_code}{$new_number_formatted}{$suffix}";
            // echo "{$lg_code}{$new_number_formatted}{$suffix}<br>";
            $new_num++;
            $done++;
    
            if ($new_num == 1000){
                echo "------- {$done} ---------<br>";
                $count_check = ($count_check - $index ) - $done;
                $index = 0;
                echo "------- {$count_check} ---------<br>";
                $suffix = incrementSuffix( $suffix );

                generator($lg_code, $index, $count_check, $suffix, $plate_numbers);
                break;
            }
        }
    }

    $lg_code = strtoupper($lg_code);
    $plate_numbers = [];

    $index = $last_num;
    $count_check = $last_num + $amount;

    generator($lg_code, $index, $count_check, $suffix, $plate_numbers);

    return $plate_numbers;
    

}

// echo incrementSuffix('CZ');

$r = genPlateNum('AAA', 0, 'AA', 3000);
foreach ($r as $rs) {
    echo $rs, '<br>';
}