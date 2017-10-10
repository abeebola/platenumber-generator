<?php 

namespace Models;

use Core\Requests as Request;
use Core\Registry;

class Lgs
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
}