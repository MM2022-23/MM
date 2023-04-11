class zipCodeService {
  isValidZipCode(zipCode) {
    const validZipCodes = {
      "07059": 9,
      "07069": 9,
      "07920": 9,
      "07921": 9,
      "07924": 9,
      "07931": 9,
      "07934": 9,
      "07938": 9,
      "07939": 9,
      "07977": 9,
      "07978": 9,
      "08502": 3,
      "08504": 7,
      "08528": 3,
      "08553": 3,
      "08558": 7,
      "08805": 7,
      "08807": 9,
      "08821": 7,
      "08823": 3,
      "08835": 7,
      "08836": 9,
      "08844": 7,
      "08853": 9,
      "08869": 7,
      "08873": 3,
      "08875": 3,
      "08876": 9,
      "08880": 7,
      "08890": 7,
      "07001": 9,
      "07008": 9,
      "07064": 9,
      "07067": 9,
      "07077": 9,
      "07080": 9,
      "07095": 9,
      "08512": 7,
      "08536": 7,
      "08810": 7,
      "08812": 9,
      "08816": 7,
      "08817": 9,
      "08818": 9,
      "08820": 9,
      "08824": 3,
      "08828": 7,
      "08830": 9,
      "08831": 9,
      "08832": 9,
      "08837": 9,
      "08840": 9,
      "08846": 9,
      "08850": 7,
      "08852": 3,
      "08854": 7,
      "08855": 7,
      "08857": 9,
      "08859": 9,
      "08861": 9,
      "08862": 9,
      "08863": 9,
      "08871": 9,
      "08872": 9,
      "08879": 9,
      "08882": 7,
      "08884": 7,
      "08899": 9,
      "08901": 7,
      "08902": 3,
      "08903": 7,
      "08904": 7,
      "08906": 7,
      "08520": 9,
      "08525": 9,
      "08534": 9,
      "08540": 7,
      "08542": 7,
      "08543": 7,
      "08550": 9,
      "08560": 9,
      "08561": 9,
      "08601": 9,
      "08602": 9,
      "08603": 9,
      "08604": 9,
      "08605": 9,
      "08606": 9,
      "08607": 9,
      "08608": 9,
      "08609": 9,
      "08610": 9,
      "08611": 9,
      "08618": 9,
      "08619": 9,
      "08620": 9,
      "08625": 9,
      "08628": 9,
      "08629": 9,
      "08638": 9,
      "08648": 9,
      "08650": 9,
      "08690": 9,
      "08691": 9,
      "07002": 9,
      "07029": 9,
      "07030": 9,
      "07032": 9,
      "07047": 9,
      "07086": 9,
      "07087": 9,
      "07093": 9,
      "07094": 9,
      "07096": 9,
      "07302": 9,
      "07303": 9,
      "07304": 9,
      "07305": 9,
      "07306": 9,
      "07307": 9,
      "07308": 9,
      "07309": 9,
      "07310": 9,
      "07311": 9,
    };

    return validZipCodes[zipCode];
  }
}

export default new zipCodeService();