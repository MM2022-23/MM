class zipCodeService {
  isValidZipCode(zipCode) {
    const validZipCodes = {
      "07001": "true",
      "07008": "true",
      "07064": "true",
      "07067": "true",
      "07077": "true",
      "07080": "true",
      "07095": "true",
      "08512": "true",
      "08536": "true",
      "08810": "true",
      "08812": "true",
      "08816": "true",
      "08817": "true",
      "08818": "true",
      "08820": "true",
      "08824": "true",
      "08828": "true",
      "08830": "true",
      "08831": "true",
      "08832": "true",
      "08837": "true",
      "08840": "true",
      "08846": "true",
      "08850": "true",
      "08852": "true",
      "08854": "true",
      "08855": "true",
      "08857": "true",
      "08859": "true",
      "08861": "true",
      "08862": "true",
      "08863": "true",
      "08871": "true",
      "08872": "true",
      "08879": "true",
      "08882": "true",
      "08884": "true",
      "08899": "true",
      "08901": "true",
      "08902": "true",
      "08903": "true",
      "08904": "true",
      "08906": "true",
      "08520": "true",
      "08525": "true",
      "08534": "true",
      "08540": "true",
      "08542": "true",
      "08543": "true",
      "08550": "true",
      "08560": "true",
      "08561": "true",
      "08601": "true",
      "08602": "true",
      "08603": "true",
      "08604": "true",
      "08605": "true",
      "08606": "true",
      "08607": "true",
      "08608": "true",
      "08609": "true",
      "08610": "true",
      "08611": "true",
      "08618": "true",
      "08619": "true",
      "08620": "true",
      "08625": "true",
      "08628": "true",
      "08629": "true",
      "08638": "true",
      "08648": "true",
      "08650": "true",
      "08690": "true",
      "08691": "true",
      "07002": "true",
      "07029": "true",
      "07030": "true",
      "07032": "true",
      "07047": "true",
      "07086": "true",
      "07087": "true",
      "07093": "true",
      "07094": "true",
      "07096": "true",
      "07302": "true",
      "07303": "true",
      "07304": "true",
      "07305": "true",
      "07306": "true",
      "07307": "true",
      "07308": "true",
      "07309": "true",
      "07310": "true",
      "07311": "true",
      "07059": "true",
      "07069": "true",
      "07920": "true",
      "07921": "true",
      "07924": "true",
      "07931": "true",
      "07934": "true",
      "07938": "true",
      "07939": "true",
      "07977": "true",
      "07978": "true",
      "08502": "true",
      "08504": "true",
      "08528": "true",
      "08553": "true",
      "08558": "true",
      "08805": "true",
      "08807": "true",
      "08821": "true",
      "08823": "true",
      "08835": "true",
      "08836": "true",
      "08844": "true",
      "08853": "true",
      "08869": "true",
      "08873": "true",
      "08875": "true",
      "08876": "true",
      "08880": "true",
      "08890": "true",
    };

    return validZipCodes[zipCode] ? true : false;
  }
}

export default new zipCodeService();
