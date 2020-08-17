// index.js
// index 파일을 없애고 NavigationService를 클래스로 구현하여 처리하고 싶었으나,
// NavigationService 객체를 한번 생성하고, 해당 객체를 이용하여 라우팅을 처리해야 되므로 불가!
import _NavigationService from './NavigationService';

export const NavigationService = _NavigationService;