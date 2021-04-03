# 서버개발

# XSS 보안 문제
DB subject 모델의 content속성은 사용자가 만든 HTML tag가 곧바로 DB에 들어가는 형식이므로 XSS취약점이 발생한다.
# XSS 취약점 해결
HTML tag의 특수문자들을 인코딩 함으로써 1차원적인 문제를 해결한다.