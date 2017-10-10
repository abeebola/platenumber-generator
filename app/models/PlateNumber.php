<?php 

namespace Models;

use Core\Requests as Request;
use Core\Registry;

class PlateNumber
{
    private $db;

    public function __construct()
    {
        $this->db = Registry::getInstance()->get('Core\Database');
    }

    public function all()
    {
        $sql = "SELECT * FROM `loc_g` ORDER BY `loc_g`.`name`";

        return $all = $this->db->fetchAll($sql);

    }

    public function new()
    {
        $form = Request::form();
        $id = $form->lg;
        $num = $form->num;

        // Set up default values
        $last_num = 0;
        $suffix = 'AA';

        // Get LG code
        $sql = "SELECT short_code FROM loc_g WHERE id = :id LIMIT 1";
        $result = $this->db->fetchOne($sql, ['id' => $id]);
        $lg_code = $result->short_code;
        
        $sql = "SELECT * FROM plate_nos
         WHERE loc_id = :id
          ORDER BY id DESC";
        $last = $this->db->fetchOne($sql, ['id' => $id]);
        
        if ( $last ){
            $last_plate_code = $last->p_code;            
            preg_match('/[0-9]+/', $last_plate_code, $match);
            $last_num = (int) $match[0];
            $suffix = substr($last_plate_code, 6, 7);
            // $last_num = (int) $last_num;
        }

        $result = $this->genPlateNum($lg_code, $last_num, $suffix, $num);

        // Save to database
        $sql = "INSERT INTO plate_nos (loc_id, p_code)
                 VALUES (:lid, :p_code)";

        // First create new array for PDO transaction
        $pdo_array = [];

        foreach ($result as $res) {
            $pdo_array[] = ['lid' => $id, 'p_code' => $res];
        }

        $insert = $this->db->insertMany( $sql, $pdo_array );
        return $result;

    }

    public function genPlateNum( $lg_code, $last_num, $suffix, $amount )
    {
        function multiples($value, $threshold, $floor = false)
        {
            $greater = $value / $threshold;
            if ($floor)
                return floor( $greater );
            return ceil( $greater );
        }
    
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
                    $count_check = ($count_check - $index ) - $done;
                    $index = 0;
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

    // public function genPlateNum( $lg_code, $last_num, $suffix, $amount )
    // {
    //     function multiples($value, $threshold, $floor = false)
	// 	{
	// 		$greater = $value / $threshold;
	// 		if ($floor)
	// 			return floor( $greater );
	// 		return ceil( $greater );
    //     }

    //     function incrementSuffix($oldSuffix)
    //     {
    //         $sArray = str_split($oldSuffix);
    //         $first = $sArray[0];
    //         $second = $sArray[1];
        
    //         $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //         $alphas = str_split($chars);
        
    //         $indexToReplace = 1;
    //         if (strtolower($second) == 'z'){
    //             $indexToReplace = 0;
    //             $sArray[1] = 'A';
    //         }
        
    //         $r_letter_index = stripos( $chars, $sArray[ $indexToReplace ] );
    //         $new_letter = substr($chars, ($r_letter_index + 1), 1);
    //         $sArray[ $indexToReplace ] = $new_letter;
        
    //         return strtoupper( implode( $sArray ) );
    //     }

    //     $lg_code = strtoupper($lg_code);

    //     $plate_numbers = array();

    //     $index = $last_num;
    //     $new_num = $index + 1;
    //     $done = 0;

    //     $count_check = $last_num + $amount;

    //     for($i = $index; $i < $count_check; $i++){
    //         $new_number_formatted = leadingZeroes($new_num, 3);
    //         $plate_numbers[] = "{$lg_code}{$new_number_formatted}{$suffix}";
    //         $new_num++;
    //         $done++;

    //         if ($new_num == 1000){
    //             $index = 0;
    //             $new_num = 1;
    //             $count_check = $amount - $done;
    //             $suffix = incrementSuffix( $suffix );
    //         }
    //     }

    //     return $plate_numbers;



    //     return multiples($id, $threshold);
        

    // }
}