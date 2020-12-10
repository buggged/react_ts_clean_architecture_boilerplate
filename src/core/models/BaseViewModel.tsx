export interface BaseView {
  onViewModelChanged(): void;
}

export default interface BaseViewModel {
  attachView(baseView: BaseView): void;
  detachView(): void;
}
