export interface ConsentClause {
  title: string;
  content: string;
}

export const consentClauses: ConsentClause[] = [
  {
    title: "[필수] 개인정보 수집/이용 동의",
    content:
      "본인은 본인확인을 위하여 개인정보 수집·이용에 동의합니다. 수집항목: 이름, 생년월일, 통신사, 휴대폰 번호 등.",
  },
  {
    title: "[필수] 고유식별정보 처리 동의",
    content:
      "주민등록번호 앞 7자리를 포함한 고유식별정보는 본인확인을 위해 사용되며, 인증 후 즉시 파기됩니다.",
  },
  {
    title: "[필수] 통신사 이용약관 동의",
    content:
      "통신사(KT, SKT, LG U+)의 인증서비스 약관에 따라 본인확인이 진행됩니다.",
  },
  {
    title: "[필수] 서비스 이용약관 동의",
    content:
      "플랫폼 이용을 위해 필수적인 서비스 제공에 대한 약관 동의가 필요합니다.",
  },
];
